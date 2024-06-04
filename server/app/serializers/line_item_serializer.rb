class LineItemSerializer
  include JSONAPI::Serializer
  attributes :user_id, :product_id, :order_id, :quantity, :created_at, :updated_at

  belongs_to :order
  belongs_to :product
  belongs_to :user
end
