class Api::WorkspacesController < ApplicationController
    wrap_parameters include: Workspace.attribute_names 
    # before_action :require_logged_in

    def index
        @workspaces = Workspace.all
        render 'api/workspaces/index'
    end 

    def show
        @workspace = Workspace.find(params[:id])
        render 'api/workspaces/show'
    end 

    def create
        @workspace = Workspace.new(workspace_params)

        if @workspace.save
            # login!(@user)
            render 'api/workspaces/show'
        else
            render json: @workspace.errors.full_messages, status: 422
        end
    end 

    private
    def workspace_params
        params.require(:workspace).permit(:name)
    end 
end
