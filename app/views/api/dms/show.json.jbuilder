json.dm do 
    json.extract! @dm, :id
end 

json.users @dm.users.each do |user| 
    json.set! user.id do 
        json.extract! user, :id, :display_name, :title
    end
end 

json.messages do
    @dm.messages.each do |dm|
        json.set! dm.id do
            json.extract! dm, :id, :author, :content
        end
    end
end 