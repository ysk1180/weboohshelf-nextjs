import Breadcrumbs from 'components/Breadcrumbs'
import generateSitemap from 'lib/generate_sitemap'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

const Terms: NextPage = () => {
  const title = '利用規約 - Web本棚'
  const description = `Web上で本棚を共有できるサービスです。ログイン不要で簡単に本棚が作成できてシェアできます。`
  const url = `https://web-bookshelf.com/`

  const h2Css = "mb-3 mt-5 text-lg text-gray-100"

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
      </Head>
      <div className="m-2 text-sm leading-relaxed text-gray-200">
        <Breadcrumbs list={[{display: '利用規約'}]} />

        <h1 className="text-xl mb-3 mt-4 text-gray-100">利用規約</h1>

        <p>この利用規約（以下、「本規約」といいます。）は、管理者がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。</p>

        <h2 className={h2Css}>第1条（適用）</h2>
        <p>本規約は、ユーザーと管理者との間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>

        <h2 className={h2Css}>第2条（利用登録）</h2>
        <p>1. 登録希望者が管理者の定める方法によって利用登録を申請し、管理者がこれを承認することによって、利用登録が完了するものとします。</p>
        <p>2. 管理者は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。</p>
        <p>（1）利用登録の申請に際して虚偽の事項を届け出た場合</p>
        <p>（2）本規約に違反したことがある者からの申請である場合</p>
        <p>（3）未成年者、成年被後見人、被保佐人または被補助人のいずれかであり、法定代理人、後見人、保佐人または補助人の同意等を得ていなかった場合</p>
        <p>（4）反社会的勢力等（暴力団、暴力団員、右翼団体、反社会的勢力、その他これに準ずる者を意味します。）である、または資金提供その他を通じて反社会的勢力等の維持、運営もしくは経営に協力もしくは関与する等反社会的勢力との何らかの交流もしくは関与を行っていると管理者が判断した場合</p>
        <p>（5）その他、管理者が利用登録を相当でないと判断した場合</p>

        <h2 className={h2Css}>3条（禁止事項）</h2>
        <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>

        <p>（1）法令または公序良俗に違反する行為</p>
        <p>（2）犯罪行為に関連する行為</p>
        <p>（3）管理者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</p>
        <p>（4）管理者のサービスの運営を妨害するおそれのある行為</p>
        <p>（5）他のユーザーに関する個人情報等を収集または蓄積する行為</p>
        <p>（6）他のユーザーに成りすます行為</p>
        <p>（7）本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</p>
        <p>（8）本サービスの他の利用者または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</p>
        <p>（9）過度に暴力的な表現、露骨な性的表現、人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現、自殺、自傷行為、薬物乱用を誘引または助長する表現、その他反社会的な内容を含み他人に不快感を与える表現を、投稿または送信する行為</p>
        <p>（10）営業、宣伝、広告、勧誘、その他営利を目的とする行為（管理者の認めたものを除きます。）、性行為やわいせつな行為を目的とする行為、面識のない異性との出会いや交際を目的とする行為、他のお客様に対する嫌がらせや誹謗中傷を目的とする行為、その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為</p>
        <p>（11）宗教活動または宗教団体への勧誘行為</p>
        <p>（12）その他、管理者が不適切と判断する行為</p>

        <h2 className={h2Css}>第4条（本サービスの提供の停止等）</h2>
        <p>1. 管理者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
        <p>（1）本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</p>
        <p>（2）地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</p>
        <p>（3）コンピュータまたは通信回線等が事故により停止した場合</p>
        <p>（4）その他、管理者が本サービスの提供が困難と判断した場合</p>
        <p>2. 管理者は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害について、理由を問わず一切の責任を負わないものとします。</p>

        <h2 className={h2Css}>第5条（著作権）</h2>
        <p>1. ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章等の情報のみ、本サービスを利用し、投稿することができるものとします。</p>
        <p>2. ユーザーが本サービスを利用して投稿した文章等の著作権については、当該ユーザーその他既存の権利者に留保されるものとします。ただし、管理者は、本サービスを利用して投稿された文章等を利用できるものとし、ユーザーは、この利用に関して、著作者人格権を行使しないものとします。</p>
        <p>3. 前項本文の定めるものを除き、本サービスおよび本サービスに関連する一切の情報についての著作権およびその他知的財産権はすべて管理者または管理者にその利用を許諾した権利者に帰属し、ユーザーは無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます。）、伝送、配布、出版、営業使用等をしてはならないものとします。</p>

        <h2 className={h2Css}>第6条（利用制限および登録抹消）</h2>
        <p>1. 管理者は、以下の場合には、事前の通知なく、投稿データを削除し、ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。</p>
        <p>（1）本規約のいずれかの条項に違反した場合</p>
        <p>（2）登録事項に虚偽の事実があることが判明した場合</p>
        <p>（3）破産、民事再生、会社更生または特別清算の手続開始決定等の申立がなされたとき</p>
        <p>（4）1年間以上本サービスの利用がない場合</p>
        <p>（5）管理者からの問い合わせその他の回答を求める連絡に対して30日間以上応答がない場合</p>
        <p>（6）第2条第2項各号に該当する場合</p>
        <p>（7）その他、管理者が本サービスの利用を適当でないと判断した場合</p>
        <p>2. 管理者は、本条に基づき管理者が行った行為によりユーザーに生じた損害について、一切の責任を負いません。</p>

        <h2 className={h2Css}>第7条（保証の否認および免責事項）</h2>
        <p>1. 管理者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</p>
        <p>2. 管理者は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。</p>
        <p>3. 前項ただし書に定める場合であっても、管理者は、管理者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（管理者またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、管理者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償はいたしません。</p>
        <p>4. 管理者は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。</p>

        <h2 className={h2Css}>第8条（広告）</h2>
        <p>管理者は、本サービスに管理者または第三者の広告を掲載することができるものとします。</p>

        <h2 className={h2Css}>第9条（サービス内容の変更等）</h2>
        <p>管理者は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。</p>

        <h2 className={h2Css}>第10条（利用規約の変更）</h2>
        <p>管理者は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。</p>

        <h2 className={h2Css}>第11条（通知または連絡）</h2>
        <p>ユーザーと管理者との間の通知または連絡は、管理者の定める方法によって行うものとします。</p>

        <h2 className={h2Css}>第12条（準拠法）</h2>
        <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
        <p>本サービスに関して紛争が生じた場合には、東京簡易裁判所又は東京地方裁判所を専属的合意管轄とします。</p>
        <p>その他、ご質問等ございましたら、開発者TwitterアカウントのDMよりご連絡下さいますようお願いいたします。</p>
        <p className="mt-5">最終更新日：2022年10月29日</p>

      </div>
    </>
  )
}

export default Terms

export const getStaticProps: GetStaticProps = async () => {
  await generateSitemap();

  return {
    props: {},
  };
};