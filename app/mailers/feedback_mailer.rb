class FeedbackMailer < ActionMailer::Base
  default :from => 'noreply@yoursite.com'

  def feedback(feedback)
    @feedback = feedback
    mail(:to => 'foodwebbuilder@googlegroups.com', :subject => 'Feedback for FoodWebBuilder')
  end
end
