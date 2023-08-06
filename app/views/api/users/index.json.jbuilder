@users.each do |user| 
    json.child! do 
        json.label user.display_name
        json.title user.title 
        json.value user.id
    end
end