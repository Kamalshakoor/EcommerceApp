class OrderSerializer
  include JSONAPI::Serializer
  attributes :user_id, :price,:address, :status, :created_at, :updated_at

  belongs_to :user
  has_many :line_items
  has_one :rating
end
