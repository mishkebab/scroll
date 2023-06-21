# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  display_name    :string           not null
#  title           :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

  before_validation :ensure_session_token

  validates :email, :session_token, presence: true, uniqueness: true
  validates :email, 
    length: { in: 3..30 },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password_digest, :display_name, presence: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  has_many :workspaces,
    class_name: 'Workspace',
    foreign_key: 'owner_id',
    inverse_of: 'owner',
    dependent: :destroy

  has_many :channels,
    class_name: 'Channel',
    foreign_key: 'owner_id',
    inverse_of: 'owner',
    dependent: :destroy


  has_secure_password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

    # if user&.authenticate(password) # equivalent
    if user && user.authenticate(password)
      return user
    end
    nil
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private
  def generate_unique_session_token
    while true
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end
end
