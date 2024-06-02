class Order < ApplicationRecord
  belongs_to :user
  has_many :line_items, dependent: :destroy
  enum status: { queue: 0, pending: 1, completed: 2 }

end
