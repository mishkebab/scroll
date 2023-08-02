class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']
    
    before_action :require_logged_out

    def show
        @user = User.find(params[:id])
        render 'api/users/show'        
    end 

    def create
        # debugger
        @user = User.new(user_params)
        @user.workspaces = Workspace.all
        @channel_sub = ChannelSubscription.new
        @channel_sub.channel_id = 1

        
        
        if @user.save
            login!(@user)

            @dm = DirectMessage.new
            @dm.workspace_id = 1
            @dm.save
            
            @dm_sub = DirectMessageSubscription.new
            @dm_sub.direct_message_id = @dm.id
            @dm_sub.user_id = 2
            @dm_sub.save
            
            @dm_sub2 = DirectMessageSubscription.new
            @dm_sub2.direct_message_id = @dm.id
            
            @message = Message.new
            @message.author_id = 2
            @message.messageable_type = "DirectMessage"
            @message.messageable_id = @dm.id
            @message.content = "Welcome to Hogwarts!"
            @message.save
            
            @channel_sub.user_id = current_user.id
            @dm_sub2.user_id = current_user.id
            if @channel_sub.save && @dm_sub2.save
                render 'api/users/show'
            end
        else
            render json: @user.errors.full_messages, status: 422
        end
    end 

    private
    def user_params
        params.require(:user).permit(:email, :title, :display_name, :password)
    end 
end
