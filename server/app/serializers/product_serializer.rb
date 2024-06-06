class ProductSerializer
  include JSONAPI::Serializer
  attributes :name, :description, :price, :created_at, :updated_at
  attribute :image_url do |object|
    Rails.application.routes.url_helpers.rails_blob_url(object.image, only_path: true) if object.image.attached?
  end

  belongs_to :category
  has_many :line_items
  has_many :ratings
end
