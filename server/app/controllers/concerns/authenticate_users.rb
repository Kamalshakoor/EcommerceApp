module AuthenticateUsers
  extend ActiveSupport::Concern
  included do
    before_action :authenticate_user
  end

  private

  def authenticate_user
    unless current_user
      render json: { errors: ['You need to be logged in to perform this action'] }, status: :unauthorized
    end
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

 end
