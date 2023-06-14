json.user do
    json.extract! @user, :id, :email, :full_name, :title, :display_name, :created_at
end 