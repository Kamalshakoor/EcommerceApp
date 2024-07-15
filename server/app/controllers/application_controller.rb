class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  include ActionController::Cookies

  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    # Rails.logger.debug "Current user: #{@current_user}" if @current_user
    # @current_user
  end
end
