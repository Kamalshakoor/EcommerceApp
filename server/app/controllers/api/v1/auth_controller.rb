class Api::V1::AuthController < ApplicationController
  def register
    user = User.new(user_params)
    if user.save
      render json: UserSerializer.new(user).serializable_hash.to_json, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      # Rails.logger.debug "Session user_id: #{session[:user_id]}" if session[:user_id]
      render json: UserSerializer.new(user).serializable_hash.to_json
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  

  def logout
    reset_session
    render json: { message: 'Successfully logged out' }
  end



  private

  def user_params
    params.require(:user).permit(:name, :email, :password,:password_confirmation,:role)
  end
  
end
