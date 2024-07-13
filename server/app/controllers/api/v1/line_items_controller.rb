class Api::V1::LineItemsController < ApplicationController
  include AuthenticateUsers
  # skip_before_action :verify_authenticity_token
  before_action :set_line_item, only: [:increment, :decrement, :destroy]

  def create
    product = Product.find(params[:product_id])
    @line_item = current_user.line_items.find_or_initialize_by(product: product, order_id: nil)

    if @line_item.new_record?
      @line_item.quantity = 1
      if @line_item.save
        render json: LineItemSerializer.new(@line_item).serializable_hash.to_json, status: :created
      else
        render json: @line_item.errors, status: :unprocessable_entity
      end
    else
      render json: { message: 'Item already in cart' }, status: :ok
    end
  end

  def increment
    @line_item.quantity += 1
    if @line_item.save
      render json: LineItemSerializer.new(@line_item).serializable_hash.to_json
    else
      render json: @line_item.errors, status: :unprocessable_entity
    end
  end

  def decrement
    @line_item.quantity -= 1
    if @line_item.quantity <= 0
      @line_item.destroy
      render json: { message: 'Item removed from cart' }
    elsif @line_item.save
      render json: LineItemSerializer.new(@line_item).serializable_hash.to_json
    else
      render json: @line_item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @line_item.destroy
    render json: { message: 'Item removed from cart' }
  end

  private

  def set_line_item
    @line_item = current_user.line_items.find(params[:id])
  end
end
