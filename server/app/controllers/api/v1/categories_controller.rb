class Api::V1::CategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_category, only: [:show, :update, :destroy]
  def index
    categories = Category.all
    render json: CategorySerializer.new(categories).serializable_hash.to_json
  end

  def show
    render json: CategorySerializer.new(@category).serializable_hash.to_json
  end

  def create
    category = Category.create(category_params)
    render json: CategorySerializer.new(category).serializable_hash.to_json, status: :created
  end

  def update
    @category.update(category_params)
    render json: CategorySerializer.new(@category).serializable_hash.to_json
  end

  def destroy
    @category.destroy
    render json: CategorySerializer.new(@category).serializable_hash.to_json
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

  def set_category
    @category = Category.find(params[:id])
  end

end
