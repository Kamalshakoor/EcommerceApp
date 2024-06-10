class OrderMailer < ApplicationMailer
  default from: 'no-reply@EcommerceApp.com'
  def order_placed(order)
    @order = order
    @user = order.user
    mail(to: @user.email, subject: 'Your order has been placed')
  end
end
