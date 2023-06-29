@dms.each do |dm|
    json.set! dm.id do
        json.id dm.id
        json.users dm.users do |user|
            json.id user.id
            json.display_name user.display_name
            json.title user.title
        end
    end
end 

