json.user do
    json.extract! @user, :id, :email, :title, :display_name, :created_at
end 