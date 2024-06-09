class Api::V1::OrdersController < ApplicationController
  skip_before_action :verify_authenticity_token
  include AuthenticateUsers
  before_action :set_order, only: [:show, :update]

  def index
    orders = current_user.orders
    render json: OrderSerializer.new(orders).serializable_hash.to_json, status: :ok
  end

  def show
    render json: OrderSerializer.new(@order).serializable_hash.to_json, status: :ok
  end

  def create
    ActiveRecord::Base.transaction do
      order = current_user.orders.create!(order_params)
      current_user.line_items.where(order_id: nil).update_all(order_id: order.id)
      order_price = current_user.line_items.joins(:product).where(order_id: order.id).sum('line_items.quantity * products.price')
      order.price = order_price
      order.save!
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
    # Only allow destruction of orders that are pending
    if @order.pending?
      @order.destroy
      render json: { message: 'Order Cancelled' }
    else
      render json: { error: "Order cannot be Cancelled as it is already in progress or completed." }, status: :unprocessable_entity
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


