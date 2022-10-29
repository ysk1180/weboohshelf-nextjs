import type { NextPage } from 'next'

const Privacy: NextPage = () => {
  const h2Css = "mb-3 mt-5 text-lg text-gray-100"

  return (
    <div className="m-2 text-sm leading-relaxed text-gray-200">
      <h1 className="text-xl mb-3 text-gray-100">プライバシーポリシー</h1>

      <p>管理者は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）におけるプライバシー情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。</p>

      <h2 className={h2Css}>第1条（プライバシー情報）</h2>
      <p>1. プライバシー情報のうち「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、ユーザー個人に関する情報であって、当該情報に含まれる氏名、連絡先その他の記述等により特定の個人を識別できる情報を指します。</p>
      <p>2. プライバシー情報のうち「履歴情報および特性情報」とは、上記に定める「個人情報」以外のものをいい、ご利用いただいたサービス、ご覧になったページや広告の履歴、ユーザーが検索された検索キーワード、ご利用日時、ご利用の方法、ご利用環境、性別、職業、年齢、ユーザーのIPアドレス、クッキー情報、位置情報、端末の個体識別情報などを指します。</p>

      <h2 className={h2Css}>第2条（プライバシー情報の収集方法）</h2>
      <p>1. 管理者は、ユーザーが利用登録をする際にメールアドレスなどの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録を管理者の提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。</p>
      <p>2. 管理者は、ユーザーについて、利用したサービスやソフトウエア、閲覧したページや広告の履歴、検索した検索キーワード、利用日時、利用方法、利用環境（携帯端末を通じてご利用の場合の当該端末の通信状態、利用に際しての各種設定情報なども含みます）、IPアドレス、クッキー情報、位置情報、端末の個体識別情報などの履歴情報および特性情報を、ユーザーが管理者や提携先のサービスを利用しまたはページを閲覧する際に収集します。</p>

      <h2 className={h2Css}>第3条（個人情報を収集・利用する目的）</h2>
      <p>管理者が個人情報を収集・利用する目的は、以下のとおりです。</p>
      <p>（1）ユーザーに自分の登録情報の閲覧や修正、利用状況の閲覧を行っていただくために、情報を表示する目的</p>
      <p>（2）ユーザーにお知らせや連絡をするためにメールアドレスを利用する場合などに連絡先情報を利用する目的</p>
      <p>（3）ユーザーからのお問い合わせに対応するために、お問い合わせ内容の情報など管理者がユーザーに対してサービスを提供するにあたって必要となる情報や、ユーザーのサービス利用状況、連絡先情報などを利用する目的</p>
      <p>（4）上記の利用目的に付随する目的</p>

      <h2 className={h2Css}>第4条（個人情報の第三者提供）</h2>
      <p>1. 管理者は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。</p>
      <p>（1）法令に基づく場合</p>
      <p>（2）人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</p>
      <p>（3）公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</p>
      <p>（4）国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</p>
      <p>（5）予め次の事項を告知あるいは公表をしている場合</p>
      <p>　　ⅰ 利用目的に第三者への提供を含むこと</p>
      <p>　　ⅱ 第三者に提供されるデータの項目</p>
      <p>　　ⅲ 第三者への提供の手段または方法</p>
      <p>　　ⅳ 本人の求めに応じて個人情報の第三者への提供を停止すること</p>
      <p>2. 前項の定めにかかわらず、次に掲げる場合は第三者には該当しないものとします。</p>
      <p>（1）管理者が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</p>
      <p>（2）合併その他の事由による事業の承継に伴って個人情報が提供される場合</p>
      <p>（3）個人情報を特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人情報の項目、共同して利用する者の範囲、利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について、あらかじめ本人に通知し、または本人が容易に知り得る状態に置いているとき</p>

      <h2 className={h2Css}>第5条（個人情報の開示・訂正・削除）</h2>
      <p>個人情報の開示・訂正・削除につきましては、開発者TwitterアカウントのDMよりご依頼ください。</p>

      <h2 className={h2Css}>第6条（個人情報の利用停止等）</h2>
      <p>管理人は、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下、「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行い、その結果に基づき、個人情報の利用停止等を行い、その旨本人に通知します。ただし、個人情報の利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって、本人の権利利益を保護するために必要なこれに代わるべき措置をとれる場合は、この代替策を講じます。</p>

      <h2 className={h2Css}>第7条（プライバシーポリシーの変更）</h2>
      <p>1. 本ポリシーの内容は、ユーザーに通知することなく、変更することができるものとします。</p>
      <p>2. 管理人が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。</p>

      <h2 className={h2Css}>第8条（お問い合わせ窓口）</h2>
      <p>本ポリシーに関するお問い合わせは、開発者TwitterアカウントのDMよりお願いいたします。</p>

      <p className='mt-5'>最終更新日：2022年10月29日</p>
    </div>
  )
}

export default Privacy
