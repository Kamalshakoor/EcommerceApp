class Order < ApplicationRecord
  belongs_to :user
  has_many :line_items, dependent: :destroy
  has_one :rating
  enum status: { pending: 0, in_progress: 1, completed: 2 }

  def calculate_total_price
    line_items.joins(:product).sum('line_items.quantity * products.price')
  end

end
