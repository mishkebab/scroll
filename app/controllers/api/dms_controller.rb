class Api::DmsController < ApplicationController
    def index
        @dms = Workspace.find_by_id(params[:workspace_id]).direct_messages
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
