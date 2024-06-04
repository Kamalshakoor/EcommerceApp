class UserSerializer
  include JSONAPI::Serializer
  attributes :name, :email, :password_digest, :role, :created_at, :updated_at

  has_many :orders
  has_many :line_items
  has_many :ratings 
end
