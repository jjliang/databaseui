class FeedbackMailer < ActionMailer::Base
  default :from => 'noreply@foodwebbuilder.com'

  def feedback(feedback)
    @feedback = feedback
    mail(:to => 'jjliang84@gmail.com', :cc => 'foodwebbuilder@googlegroups.com', :subject => 'Feedback for FoodWebBuilder')
  end
end
