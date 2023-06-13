json.user do
    json.extract! @user, :id, :email, :title, :full_name, :created_at
end 