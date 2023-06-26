class Api::DmsController < ApplicationController
    def index
        @dms = current_user.direct_messages
        render '/api/dms/index'
    end

    def show
        @dm = DirectMessage.find(params[:id])
        render '/api/dms/show'
    end 

    private
    def dm_params
        params.require(:dm).permit(:workspace_id)
    end 
end
