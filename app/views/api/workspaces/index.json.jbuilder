@workspaces.each do |workspace|
    json.set! workspace.id do 
        json.id workspace.id
        json.name workspace.name
        json.users workspace.users do |user|
            json.set! user.id do
                json.id user.id
                json.display_name user.display_name
                json.title user.title
            end 
        end 
    end
end 