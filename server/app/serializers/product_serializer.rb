class ProductSerializer
  include JSONAPI::Serializer
  attributes :name, :description, :price, :image, :created_at, :updated_at

  belongs_to :category
  has_many :line_items
  has_many :ratings
end
