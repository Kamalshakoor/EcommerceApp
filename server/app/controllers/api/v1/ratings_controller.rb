class Api::V1::RatingsController < ApplicationController
  # skip_before_action :verify_authenticity_token
  include AuthenticateUsers
  before_action :set_order, only: [:create]

  def create
    rating_params = params.require(:rating).permit(:rating, :comment)
    ActiveRecord::Base.transaction do
      @order.line_items.each do |line_item|
        rating = @order.create_rating!(
          user: current_user,
          product: line_item.product,
          rating: rating_params[:rating],
          comment: rating_params[:comment]
        )
      end
    end

    render json: { message: 'Rating submitted successfully' }, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: e.record.errors, status: :unprocessable_entity
  end

  private

  def set_order
    @order = current_user.orders.find(params[:order_id])
  end
end
