class User < ApplicationRecord
  has_secure_password

  has_many :orders, dependent: :destroy
  has_many :line_items, dependent: :destroy

  enum role: { user: 0, admin: 1 }
end
