class Api::V1::OrdersController < ApplicationController
  # skip_before_action :verify_authenticity_token
  include AuthenticateUsers
  before_action :authenticate_admin, only: [:admin_index]
  before_action :set_order, only: [:show, :update, :destroy]

  def index
    orders = current_user.orders
    render json: OrderSerializer.new(orders).serializable_hash.to_json, status: :ok
  end

  def admin_index
    orders = Order.all
    render json: OrderSerializer.new(orders).serializable_hash.to_json, status: :ok
  end

  def show
    render json: OrderSerializer.new(@order).serializable_hash.to_json, status: :ok
  end

  def create
    ActiveRecord::Base.transaction do
      order = current_user.orders.create!(order_params)
      current_user.line_items.where(order_id: nil).update_all(order_id: order.id) # Update order_id of line items
      order.update(price: order.calculate_total_price) # Set the order price
      OrderMailer.order_placed(order).deliver_now
      render json: OrderSerializer.new(order).serializable_hash.to_json, status: :created
    rescue ActiveRecord::RecordInvalid => e
      render json: e.record.errors, status: :unprocessable_entity
    end
  end
  

  def update
    # Allow updates only if the order is pending
    if @order.pending?
      if @order.update(order_params)
        render json: OrderSerializer.new(@order).serializable_hash.to_json
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "Order cannot be updated as it is already in progress or completed." }, status: :unprocessable_entity
    end
  end

  def destroy
    begin
      Order.transaction do
        # Rails.logger.debug "Deleting Order: #{@order.id} with LineItems: #{@order.line_items.pluck(:id)}"
        @order.line_items.destroy_all
        @order.destroy!
      end
      render json: { message: 'Order and associated line items deleted successfully' }, status: :ok
    rescue ActiveRecord::InvalidForeignKey => e
      # Rails.logger.error "Foreign Key Constraint Error: #{e.message}"
      render json: { errors: 'Failed to delete order due to foreign key constraint.' }, status: :unprocessable_entity
    rescue => e
      # Rails.logger.error "Failed to delete order: #{e.message}"
      render json: { errors: 'Failed to delete order. Please try again.' }, status: :unprocessable_entity
    end
  end

  def admin_destroy
    begin
      Order.transaction do
        order = Order.find(params[:id])
        # Rails.logger.debug "Deleting Order: #{order.id} with LineItems: #{order.line_items.pluck(:id)}"
        order.line_items.destroy_all
        order.destroy!
      end
      render json: { message: 'Order and associated line items deleted successfully' }, status: :ok
    rescue ActiveRecord::InvalidForeignKey => e
      # Rails.logger.error "Foreign Key Constraint Error: #{e.message}"
      render json: { errors: 'Failed to delete order due to foreign key constraint.' }, status: :unprocessable_entity
    rescue => e
      # Rails.logger.error "Failed to delete order: #{e.message}"
      render json: { errors: 'Failed to delete order. Please try again.' }, status: :unprocessable_entity
    end
  end


  private

  def set_order
    @order = current_user.orders.find(params[:id])
  end

  def order_params
    params.require(:order).permit(:address, :status)
  end
end
