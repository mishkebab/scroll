json.dm do 
    json.id @dm.id
    json.users @dm.users do |user|
        json.id user.id
        json.display_name user.display_name
        json.title user.title
    end 
end 

json.messages do
    @dm.messages.each do |dm|
        json.set! dm.id do
            json.extract! dm, :id, :author, :content
        end
    end
end 