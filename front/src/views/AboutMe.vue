<template>
  <div class="FlexContent">
    <div class="LeftPart">
      <div class="BigBlock">
        <div class="TitleFontLine">博客特色</div>
        <p>
          <el-icon style="color: rgb(73, 169, 238)"><UserFilled /></el-icon
          >本博客不强制游客注册/登录，留言/评论等功能只需填入昵称，即可使用。
        </p>
        <p>
          <i class="iconfont icon-github" style="color: rgb(148, 138, 236)"></i
          >博客对外开放管理后台、流量数据、所有源码等，分享技术，毫无保留。
        </p>
        <p>
          <i
            class="iconfont icon-servicer-full"
            style="color: rgb(247, 142, 61)"
          ></i
          >博客用户端、管理后台、后端接口、UI设计、服务器部署全部由一人维护。持续优化，随时更新。
        </p>
        <p>
          <i
            class="iconfont icon-qianduankaifa"
            style="color: rgb(61, 184, 193)"
          ></i
          >已实现各种父子组件、数据缓存、防抖节流、用户轨迹、首屏优化、访问数据分析等功能。
        </p>
        <p>
          <i
            class="iconfont icon-aixin_shixin"
            style="color: rgb(244, 110, 101)"
          ></i
          >跪求Github一赞，点个星星将是对开源开发者的最大支持与鼓励！
        </p>
      </div>
      <div class="BigBlock AboutMeMarginTop">
        <div class="TitleFontLine">博客技术</div>
        <p>
          <el-icon style="color: rgb(73, 169, 238)"><DataLine /></el-icon
          >本博客纯手工编写，未使用第三方建站或流量统计工具。代码开源，欢迎匡正。
        </p>
        <p>
          <i
            class="iconfont icon-qianduankaifa"
            style="color: rgb(148, 138, 236)"
          ></i
          >用户端手写的UI组件 + Vue.js，管理端使用ElementUI + Vue.js
        </p>
        <p>
          <i
            class="iconfont icon-servicer-full"
            style="color: rgb(247, 142, 61)"
          ></i
          >服务端语言使用node.js、框架使用Express，博客部署在腾讯云、使用Linux服务器。
        </p>
        <p>
          <i class="iconfont icon-shujuku" style="color: rgb(61, 184, 193)"></i
          >数据库使用MongoDB，可视化工具用的Robo 3T。
        </p>
        <p>
          <i class="iconfont icon-github" style="color: #948aec"></i
          >用户端/管理端/后端代码：<a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub地址</a
          >
          。整套代码都在这了！
        </p>
      </div>
      <div class="BigBlock AboutMeMarginTop">
        <div class="TitleFontLine">关于博主</div>
        <p>
          <el-icon style="color: rgb(73, 169, 238)"><UserFilled /></el-icon
          >博主名字叫Jayden，80后，机电专业毕业，从事前端开发岗位。
        </p>
        <p>
          <i
            class="iconfont icon-aixin_shixin"
            style="color: rgb(244, 110, 101)"
          ></i
          >兴趣：编码、游戏、足球(皇马球迷)、电影。喜爱历史类书籍。
        </p>
        <p>
          <i class="iconfont icon-gongju" style="color: rgb(247, 142, 61)"></i
          >熟悉的技术有：ElementUI、Vue.js、Node.js、JavaScript、react.js。
        </p>
        <p>
          <el-icon style="color: rgb(148, 138, 236)"
            ><LocationInformation /></el-icon
          >家庭住址：湖南长沙
        </p>
      </div>
      <div class="BigBlock AboutMeMarginTop">
        <div class="TitleFontLine">Thanks You All</div>
        <div class="UrlCardTr">
          <el-row :gutter="20">
            <el-col :span="8">
              <a
                href="http://39.104.22.73:67"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="UrlIconName UrlIconNameMargin">
                  <img src="../assets/images/link-img.jpg" alt="" srcset="" />
                  <div class="about-UrlName">孙权的Github</div>
                </div>
              </a></el-col
            >
          </el-row>
        </div>
      </div>
    </div>
    <div class="RightPart">
      <div class="Module GitModule">
        <GitPart />
      </div>
      <BigBlock />
    </div>
  </div>
</template>

<script setup lang="ts">
import GitPart from '@/components/GitPart.vue';
import BigBlock from '@/components/BigBlock.vue';
</script>

<style scoped lang="less">
.FlexContent {
  display: flex;
  align-items: start;
  width: 1088px;
  margin: 74px auto 0;
  .LeftPart {
    width: 75%;
    margin-right: 0.5rem;
    border-radius: 2px;
    position: relative;
    .BigBlock {
      padding: 1rem 4.5rem 2rem;
      background-color: #fff;
      .TitleFontLine {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 400;
        color: #333;
        margin-top: 1rem;
      }
      p {
        margin: 2rem 0;
        i {
          padding: 0 0.5rem;
          font-size: 1.2rem;
        }
      }
    }
    .AboutMeMarginTop {
      margin-top: 1rem;
    }
  }
  .RightPart {
    width: 25%;
    margin-left: 0.5rem;
    border-radius: 2px;
    position: sticky;
    position: -webkit-sticky;
    top: 72px;
    .GitModule {
      margin-top: 0;
    }
  }
}
.UrlCardTr {
  position: relative;
  margin-top: 1rem;
  a {
    text-decoration: none;
    color: #333;
    background-color: #e9e9e9;
    padding: 0;
    display: block;
    width: 100%;
  }
  .UrlIconName {
    align-items: center;
    padding: 1.2rem 1rem 1rem 1rem;
    display: flex;
    align-items: center;
    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 100%;
    }
    .about-UrlName {
      font-size: 14px;
      height: 1rem;
      padding-left: 0.5rem;
    }
  }
}
</style>
