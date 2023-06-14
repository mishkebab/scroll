class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']
    
    before_action :require_logged_out

    def create
        @user = User.new(user_params)

        if @user.save
            login!(@user)
            render json: @user
        else
            render json: @user.errors.full_messages, status: 422
        end
    end 

    private
    def user_params
        params.require(:user).permit(:email, :full_name, :title, :display_name, :password)
    end 
end
