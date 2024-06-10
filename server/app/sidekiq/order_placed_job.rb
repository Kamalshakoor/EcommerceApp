class OrderPlacedJob
  include Sidekiq::Job

  def perform(order_id)
    @order = Order.find(order_id)
    OrderMailer.order_placed(@order).deliver_now
  end
end
