class Api::DmsController < ApplicationController
    def index
        @dms = current_user.direct_messages
        render '/api/dms/index'
    end

    def show
        @dm = DirectMessage.find(params[:id])
        render '/api/dms/show'
    end

    def create
        @dm = DirectMessage.new(dm_params)

        if !@dm.save
            render json: @dm.errors.full_messages, status: 422
        else
            render '/api/dms/show'
        end 
    end 

    def update
        @dm = DirectMessage.find(params[:id])

        if !@dm.update(dm_params)
            render json: @dm.errors.full_messages, status: 422
        else
            render '/api/dms/show'
        end 
    end

    private
    def dm_params
        params.require(:dm).permit(:workspace_id)
    end 
end
