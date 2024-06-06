class Product < ApplicationRecord
  belongs_to :category
  has_many :line_items, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :orders, through: :line_items
  has_one_attached :image
end
