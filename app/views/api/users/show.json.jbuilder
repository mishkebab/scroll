json.user do
    json.extract! @user, :id, :email, :title, :display_name
end

