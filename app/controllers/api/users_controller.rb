class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']
    
    before_action :require_logged_out

    # def show
        
    # end 

    def create
        # debugger
        p Workspace.all
        @user = User.new(user_params)
        @user.workspaces = Workspace.all

        if @user.save
            login!(@user)
            render 'api/users/show'
        else
            render json: @user.errors.full_messages, status: 422
        end
    end 

    private
    def user_params
        params.require(:user).permit(:email, :title, :display_name, :password)
    end 
end
