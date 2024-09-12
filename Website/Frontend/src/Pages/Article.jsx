import img from "../Images/stress.jpg";
import { Section } from "../Components/styles-components/containers";
import {
  Body,
  H1,
  H5,
  Caption,
} from "../Components/Typography-components/Typography";
import { Link } from "react-router-dom";

function Article() {
  return (
    <Section className="justify-center">
      <div className="w-full sm:w-2/3 flex flex-col gap-6">
        <ArticleHeader />
        <ArticleBody />
      </div>
    </Section>
  );
}

function ArticleHeader() {
  return (
    <div className="flex flex-col">
      <div
        id="artical-header"
        className="border-b-2 py-16 flex flex-col gap-4 mb-16"
      >
        <H1 className="font-semibold leading-none text-primaryIndigo font-spaceGrotesk">
          How to manage stress at my work
        </H1>
        <H5 className="font-medium text-justify text-slate-500">
          Explore practical strategies for managing workplace stress
          effectively. This article provides actionable tips on identifying
          stress triggers, implementing stress-reduction techniques, and
          maintaining a healthy work-life balance. Discover how to create a more
          productive and positive work environment by mastering stress
          management skills.
        </H5>
        <ArticleInfo />
      </div>
      <img src={img} alt="" className="rounded-2xl" />
    </div>
  );
}

function ArticleInfo() {
  return (
    <div className="grid grid-cols-2 py-5 text-slate-600">
      <div id="user" className="flex flex-col">
        <Caption className="font-bold">WRITTEN BY</Caption>
        <Link to="/coach-profile">
          <div className="flex gap-2 place-items-center">
            <div className="h-8 w-8 rounded-full">
              <img src={img} alt="" className="h-full w-full rounded-full" />
            </div>
            <Caption className="font-medium">User Name</Caption>
          </div>
        </Link>
      </div>
      <div id="date">
        <Caption className="font-bold">PUBLISHED ON</Caption>
        <Caption className="font-medium">Jan 11, 2024</Caption>
      </div>
    </div>
  );
}

function ArticleBody() {
  return (
    <Body className="text-justify font-medium text-slate-600">
      When I am coaching candidates on stress management, firstly I identify
      their personality working type and use this vital information to alleviate
      their vulnerability. Most of us experience an element of stress in our
      working lives. Its intensity will vary and be mainly dependent on the
      following causal factors: your personality type, your work performance and
      environment, and your personal circumstances. If you suffer an unexpected
      and close family bereavement and you are not coping with the pressures of
      work, then the combination can cause negative stress and greatly influence
      your performance. Having a better understanding of what is the most likely
      factor to cause you stress can help you to recognise the symptoms and
      alleviate the stress through positive management. It is important to
      acknowledge that most people do not realise when they are suffering from
      negative stress. There is a tendency to be defensive when told ‘You seem
      stressed!’ ‘No, I am not stressed, just very busy at work. Nothing I can’t
      cope with.’ Stress can cause denial, whereby the person will adopt a
      defensive attitude and it can be difficult to help or speak rationally to
      them regarding their problem. It is a shame that stress can cause so much
      unhappiness in terms of the quality of life, to the point sometimes of
      causing bad health such as strokes and heart attacks or mental breakdowns,
      before any remedial action is taken. You will be familiar with the type of
      comment: ‘Since my heart attack I have learned to get my priorities right.
      I exercise, eat better, enjoy work and all round I am much happier.’ It is
      a shame that it has taken a catastrophic event to acknowledge the
      negativity of stress and re-adjust a lifestyle. The following information
      may help you to become more alert to situations or circumstances with
      which you may find difficulty coping. Good advice is always to use
      external parameters as an indication of stress rather than your emotive
      reaction. If you feel the stress is negatively influencing your work
      performance, then force yourself to discuss the situation with a friend.
      Disclosure and discussion always help to gain a different perspective on
      an issue that is worrying you. It can be easy for a third party to
      recommend another way, a solution and help you to implement it. This is a
      satisfying and rewarding part of my role as a coach. I have identified 4
      very distinct and different personality types: the Supporter, the
      Influencer, the Creative and the Analyst and I use this knowledge in all
      my 1-2-1 coaching sessions with very exciting and positive outcomes. The
      Supporter and stress The Supporter is sensitive to the work environment
      from the people perspective. An aggressive and uncaring atmosphere at work
      will cause the Supporter stress. An aggressive and uncaring colleague or
      manager at work will similarly cause stress. The Supporter’s natural
      inclination is to avoid contentious situations rather than confront them
      as this is not compliant with their sensitive nature. Domineering or
      bullying types will tend to capitalise on the Supporter’s rather placatory
      persona and their behaviour can become more intimidating and stressful. It
      is difficult to coach a Supporter to deal with these types of extreme
      behaviour on their own. The most successful approach is to ask for help
      and discuss the situation with a work colleague or manager. For the
      situation to be effectively dealt with, it is imperative that the
      perpetrator is contacted by a third party and made aware of the complaint.
      In many situations, the person may not be aware of the extent of their
      intimidating behaviour and most often their response is conciliatory
      rather than defensive. In my experience this type of action generates a
      personal apology and a cessation of the problem. The Supporter must be
      prepared to ask for help and refer to a colleague and follow the
      colleague’s advice to actively confront the situation. Taking no course of
      action will cause the stress to increase and create a situation of
      unhappiness and severe pressure on the work and family environment.
      Ignoring the issue is not an option. The Influencer and stress The
      Influencer thrives on recognition and acknowledgement of achievements.
      They are generally not prone to stress, as they tend to share their
      problems with whomever is prepared to listen. This sharing, or to put it
      more unkindly off-loading, means that problems don’t tend to fester in
      their minds. If a problem arises, the Influencer will not naturally
      volunteer ownership if it reflects negatively on their reputation. The
      Influencer has a large ego and they are protective of their reputation,
      vehemently defending any misunderstanding that negatively reflects on
      their personality or achievements. If the Influencer is wrongly accused
      and the accusation reflects negatively on them, they will ‘move verbal
      mountains’ to clarify the situation and rectify the mistake that dents
      their ego. Situations where the Influencer is not given due credit for
      performance or is misunderstood will cause stress. The Influencer plays to
      win and if there is no benchmark for competitiveness and high profiling,
      then they will become frustrated and bored. Work that is highly
      repetitive, monotonous and with no transparent goals for achievement will
      cause them frustration and the likelihood of changing roles. Not gaining
      fair recognition, not being able to perform competitively, being
      misunderstood, misinterpreted or being falsely accused are the dominant
      situations that will cause stress to the Influencer. The Influencer can
      solve their own problems as they are good with people and highly
      articulate. Therefore if they do not have the opportunity to perform or
      clear their name, the Influencer will feel caged and these circumstances
      would be intolerably stressful. The Creative and stress For the Creative
      the causal factor for stress will be work related. The Creative has been
      described as a well-defined personality type with individual traits. The
      ability to conceptualise is unique. The ability to create is unique to the
      Creative whether it is a product, a building, a musical composition, fine
      art, media or graphics, etc. all of which are different, radical and
      instrumental in the generation of global sales on an unprecedented basis.
      Unlike the other personality traits where one can identify a single factor
      which is the dominant cause of stress, the Creative can be negatively
      influenced and frustrated by a number of factors. Working in a
      highly-disorganised environment, unable to use their design and creative
      abilities and working in a role that lacks challenge or is repetitive and
      boring, are factors that singularly or collectively will cause the
      Creative to be stressed. Similarly, an environment where their talents are
      not appreciated but disregarded and critiqued, will cause the Creative to
      lose confidence in their abilities and the resultant lack of benefit of
      their work will cause stress. They are not good at just ‘playing the
      game’. Very often the only solution is to change role or job, advice which
      will probably clarify or explain why Creatives change roles more than the
      average or why they often prefer to work freelance. The Creative could be
      coached to adopt a more tolerant attitude but that approach is more likely
      to be at the expense of losing some of that positive dynamism that can be
      the key to their success. The Analyst and stress Similar to the Creative,
      the factor that will cause the most stress to the Analyst will be poor
      project definition and time. It will be directly work related. The Analyst
      views the developmental perspective in parallel with the end goal. Their
      mentality is such that diligently fulfilling the role to a satisfactory
      technical conclusion is their prime focus – time deadlines can at times be
      secondary considerations. If there is a time overrun and the cause is
      outside the control of the Analyst, most often they will not explain this
      fact. Anything smacking of an excuse is anathema to the Analyst. They do
      not vehemently defend their corner as the Influencer would do and they do
      not indulge in blame culture. The Analyst needs to be convinced that the
      time target is real and that the overrun consequences are also real. ‘They
      always want things done by yesterday. They don’t understand the complexity
      of the content. You can’t rush these things. They are complicated and you
      have to get it right however long it takes.’ This type of typical reaction
      from the Analyst can cause frustration to those to whom they are reporting
      and the Analyst will not enjoy the criticism this type of insular reaction
      will evoke. To alleviate the stress from ‘unprovoked negative reactions’
      (as an Analyst might consider), the Analyst must explain in detail the
      components of the task in terms of content, complexity parameters and the
      aspects which, at the early stages, may not be definitive. A car engine
      may appear to have a particular fault as a result of the noise it is
      making, but the mechanic will make the proviso that they cannot ascertain
      the problem until they dismantle the particular parts and examine it
      personally. The Analyst must explain the process even though it is not
      their natural remit. This will share the time onus in terms of defining a
      target and will alleviate the stress caused by overrunning the target.
      Detailed explanations help to depersonalise situations and by continually
      briefing colleagues on the progress of the task, the Analyst will fend off
      those stressful, irate reactions to their apparent lack of time
      priorities.
    </Body>
  );
}
export default Article;
