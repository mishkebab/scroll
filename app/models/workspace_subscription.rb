# == Schema Information
#
# Table name: workspace_subscriptions
#
#  id           :bigint           not null, primary key
#  user_id      :bigint           not null
#  workspace_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class WorkspaceSubscription < ApplicationRecord
  belongs_to :user
  belongs_to :workspace
end
