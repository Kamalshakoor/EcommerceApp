class Api::V1::ProductsController < ApplicationController
  skip_before_action :verify_authenticity_token
  include AuthenticateUsers
  # before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_product, only: [:show, :update, :destroy]


  def index
    products = Product.all
    render json: ProductSerializer.new(products).serializable_hash.to_json
  end

  def show
    render json: ProductSerializer.new(@product).serializable_hash.to_json
  end

  def create
    product = Product.create(product_params)
    render json: ProductSerializer.new(product).serializable_hash.to_json
  end

  def update
    @product.update(product_params)
    render json: ProductSerializer.new(@product).serializable_hash.to_json
  end

  def destroy
    @product.destroy
    render json: ProductSerializer.new(@product).serializable_hash.to_json
  end

  private

  def product_params
    params.require(:product).permit(:name, :description, :price, :image, :category_id)
  end

  def set_product
    @product = Product.find(params[:id])
  end
end
