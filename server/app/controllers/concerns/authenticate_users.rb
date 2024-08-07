module AuthenticateUsers
  extend ActiveSupport::Concern
  included do
    before_action :authenticate_user
  end

  private

  def authenticate_user
    unless current_user
      # Rails.logger.debug "User is not authenticated"
      render json: { errors: ['You need to be logged in to perform this action'] }, status: :unauthorized
    end
  end

  def authenticate_admin
    unless current_user && current_user.admin?
      render json: { errors: ['You need to be an admin to perform this action'] }, status: :unauthorized
    end
  end



 end
