@workspaces.each do |workspace|
    json.set! workspace.id do 
        json.id workspace.id
        json.name workspace.name
    end
end 