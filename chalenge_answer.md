# チュートリアルに記載されているチャレンジに対する回答
## チャプター2
### package.jsonとpackage-lock.jsonの違い
#### 問題文
create-react-app によって生成されたディレクトリには、package.json の他に、package-lock.json という json ファイルも生成されています。この json ファイルには、どのような役割があるか、調べてみましょう。
#### 回答
##### package.jsonとは
- プロジェクトが依存しているパッケージを記述したjsonファイル
  - パッケージ名とバージョンの**範囲**が記されている
- チーム開発を行う際に環境をいちいち丸ごと共有するのは面倒なので、パッケージの名前とバージョンだけ共有して、各自でインストールできるようにする。
  - `npm install`で丸ごとインストールできる
##### package-lock.jsonとは
- プロジェクトが依存しているパッケージを記載したjsonファイル
  - パッケージ名と**正確な**バージョンが記されている
  - 同一のnode_module ツリーを生成できるように、生成された正確なツリーを記述するもの
    - インストールされたパッケージの正確なバージョン
    - 相対パスでのロケーション
##### 何が違うのか？
- package.jsonのみだと、記されているバージョン範囲の中で最新のものがインストールされる
  - つまり`npm install`をするタイミングによって環境が異なってしまう
- package-lock.jsonを用いて**正確な**バージョンを記すことで、`npm install`を実行しても最新のバージョンがインストールされず、lockファイルに記されているバージョンでインストールをする
##### package-lock.jsonだけで良くね？
- package-lock.jsonに正確なnode_moduleツリーが記されているなら、package.jsonはいらないのでは？と思ったので少し調べてみた。
- 結論からすれば、package.jsonはちゃんと必要だった
  - package.jsonに記載されている情報は依存関係だけじゃない
  - プロジェクトのプロパティや説明、ライセンス情報等を定義する
  - プロジェクト全体の概要？みたいなものを記載するという役割もあるので必要
#### 参考資料
- [package.jsonとpackage-lock.json とは？（Node.js/React）](https://tomiko0404.hatenablog.com/entry/2021/10/07/package-json#package-lockjson%E3%81%A8%E3%81%AF)
- [package-lock.jsonとyarn.lockの存在理由](https://zenn.dev/luvmini511/articles/56bf98f0d398a5)
- [nvm, Node.js, package.json, npm, yarn, webpackの違いについて](https://qiita.com/ryouzi/items/5b0158ba1a77bf4b6004)
- [npmの依存関係について勘違いしていたこと](https://zenn.dev/estra/articles/npm-about-dependencsies)
  - めちゃくちゃ詳しく書いてあって面白かったので是非読んでほしい
- [Do I need both package-lock.json and package.json?](https://stackoverflow.com/questions/45052520/do-i-need-both-package-lock-json-and-package-json)
- [package.json vs package-lock.json: do you need both?](https://dev.to/salothom/package-json-vs-package-lock-json-do-you-need-both-1mjf)

## チャプター3
チャプター3ではチャレンジがなかったので、参考資料等を見て気になったことの調査をする
以下気になったことリスト
- constとletの使い分け
- reactのコンポーネントに関して広く浅く知見を深めたい

## チャプター4
### Enterキーを押して、onMessageSubmitを呼ぶ
#### 問題文
現在は、「送信する」ボタンの onClick イベントでのみ、onMessageSubmit が呼ばれるようになっています。例えば、ユーザーが Enter キーをキーボードで押した時にも、onMessageSubmit を呼ぶには、どのような改修をすればよいでしょうか？ MessageArea component の実装を改修して、Enter キーを押した時にも、onMessageSubmit が実行されるようにしてみてください。
#### 回答
```diff
 <Input
     value={props.message}
+    onKeyPress={(event) => {if(event.key === 'Enter'){props.onMessageSubmit()}}}
     onChange={props.onMessageChange}
  />
```
- この書き方で問題ないのかは結構疑問
  - propsで渡した方が良いのか？
#### 参考
- [ReactでInputフォームのEnterキーで処理を行う](https://blog.freks.jp/react-submit-with-enter/)

## チャプター5
### カードをクリックしたら、ユーザーのgithubページに遷移する
#### 問題文
ユーザーの情報が表示されているカードをクリックした際に、そのユーザーの GitHub のプロフィールページを新しいタブで開く実装をしてみましょう。
例: queq1890 のカードをクリックした場合 => https://github.com/queq1890 を新しいタブで開く
### 回答
```diff
 type GitHubProfile = {
     login: string;
     name: string;
     avatar_url: string;
+    html_url: string;
 }
 /*** 省略 ***/
 return (
     <Stack spacing={1}>
         {profile && (
             <Card
                 sx={{
                     width: 300,
                 }}
+                onClick={()=>{window.open(profile.html_url)}}
             >
                 <CardHeader
                     avatar={<Avatar src={profile.avatar_url} />}
                     title={profile.name}
                     subheader={profile.login}
                 />
             </Card>
         )}
        <TextInputArea value={userName} onChange={onChange} onSubmit={onSubmit} />
    </Stack>
);
```
#### 参考
- [【React】外部リンクに飛ぶ方法【Javascript】](https://qiita.com/GalaxyNeko/items/33f599951eff624a7d8a)

### fetch失敗時の対処
#### 問題文
現在の Profile component の onSubmit は、ユーザーのプロフィールの fetch に成功した場合のロジックしか実装されていません。存在しない userName が指定された場合など、ユーザーのプロフィールの fetch に失敗した場合に、「ユーザーの情報が取得できませんでした」というエラーメッセージを Profile component 内で render する実装をしてみましょう。
#### 回答
```diff
const onSubmit = async () => {
    const response = await fetch(`https://api.github.com/users/${userName}`)
    const data = await response.json();

-    if (response.ok){
+    if (response.status === 200) {
        setProfile(data);
-    }
+    } else {
+        setProfile({
+            login: '',
+            name: 'ユーザーの情報が取得できませんでした',
+            avatar_url: '',
+            html_url: '',
+        })
+    }
};

```