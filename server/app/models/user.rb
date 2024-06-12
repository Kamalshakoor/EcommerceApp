class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }
  has_secure_password

  has_many :orders, dependent: :destroy
  has_many :line_items, dependent: :destroy
  has_many :ratings

  enum role: { user: 0, admin: 1 }
end
