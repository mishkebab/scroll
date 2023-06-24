@dms.each do |dm|
    json.set! dm.id do 
        json.id dm.id
        json.users dm.users.each do |user|
            json.id user.id
            json.name user.display_name
        end 
    end
end 

