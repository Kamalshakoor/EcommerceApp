class RatingSerializer
  include JSONAPI::Serializer
  attributes :user_id, :product_id, :order_id, :rating, :comment, :created_at, :updated_at

  belongs_to :user
  belongs_to :product
  belongs_to :order
end
