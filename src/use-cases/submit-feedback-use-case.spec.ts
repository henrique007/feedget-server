import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const creatFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  {create: creatFeedbackSpy},
  {sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This feedback',
      screenshot: 'data:image/png;base64.test.svg',
    })).resolves.not.toThrow();

    expect(creatFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should be not able to submit feedback without type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'This feedback',
      screenshot: 'data:image/png;base64.test.svg',
    })).rejects.toThrow();
  });

  it('should be not able to submit feedback without comment', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64.test.svg',
    })).rejects.toThrow();
  });

  it('should be not able to submit feedback with an ivalid screenshot', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This feedback',
      screenshot: 'test.svg',
    })).rejects.toThrow();
  });
});