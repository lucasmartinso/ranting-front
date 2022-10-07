import styled from "styled-components";

export default function RenderReviews() { 
    return(
        <Post>
            <PictureAndLike>
                <img src="abacaxi" alt="aba"/>
                <p>30 likes</p>
                <ion-icon name="chatbubble-ellipses-outline" id="comments"></ion-icon>
                <p>30 comments</p>
            </PictureAndLike>
            <PostInfo>
                <p>mckmkdmkc</p> 
                <a>cdnjdncjncdndc</a>
                <MainInfo>
                    <MainInfoDescription>
                        <h3>hahahaha</h3>
                        <h4>oi</h4>
                        <h5>bom dia</h5>
                    </MainInfoDescription>
                        <img src="tomate" alt="tomate"/>
                </MainInfo>
            </PostInfo>
        </Post>
    )
}

const Post = styled.li`
  width: 100%;
  height: 276px;
  display: flex;
  background-color: rgba(23, 23, 23, 1);
  padding: 19px 23px 20px 20px;
  border-radius: 16px 16px 0px 0px;
  margin-bottom: 18px;
`;
const PictureAndLike = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 20px;
    object-fit: cover;
  }

  ion-icon {
    width: 25px;
    height: 25px;

    &:hover {
      cursor: pointer;
    }
  }

    ion-icon#heart {
        color: rgba(172, 0, 0, 1);
    } 

    ion-icon#heart-outline {
        color: white;
    }

    p {
        margin-top: 4px;
        margin-bottom: 15px;
        font-size: 11px; 
        color: white;
    } 

    ion-icon#comments {
        color: white;
    }

    ion-icon#repost {
        color: white;
    }
 `
const PostInfo = styled.div`
    width: 90%;
    height: 100%; 
    display: flex; 
    flex-direction: column;
    margin-left: 18px;

    p { 
        font-size: 19px; 
        color: rgba(255, 255, 255, 1);
        margin-bottom: 8px;
    } 

    a { 
        font-size: 19px; 
        color: rgba(183, 183, 183, 1); 
        margin-bottom: 10px;
        line-height: 20px;
    }
 `
const MainInfo = styled.div`
    width: 100%; 
    height: 90%; 
    border: 1px solid rgba(77, 77, 77, 1);
    border-radius: 12px; 
    display: flex;

    img { 
        width: 30%;
        height: 100%;
        border-radius: 0px 12px 13px 0px;
        object-fit: cover;
    }

    &:hover { 
        cursor: pointer;
    }
 `
const MainInfoDescription = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 28px 23px 20px;

  h3 {
    font-size: 16px;
    color: rgba(206, 206, 206, 1);
    text-align: left;
    margin-bottom: 8px;
  }

  h4 {
    font-size: 16px;
    color: rgba(155, 149, 149, 1);
    text-align: left;
    margin-bottom: 8px;
  }

  h5 {
    font-size: 16px;
    color: rgba(206, 206, 206, 1);
    text-align: left;
    margin-bottom: 8px;
  }
`;


