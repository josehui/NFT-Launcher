import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";

const editorTheme = {
  palette: {
    // 'bg-secondary': '#006089',
    "bg-secondary-opacity": "0",
    BordersSecondary: "borders-secondary",
  },
  typography: {
    fontFamily: "Roboto, Arial",
  },
};
const ImageEditor = ({ image, saveEdit, closeEdit }) => {
  return (
    <>
      {image && (
        <FilerobotImageEditor
          // source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
          source={image}
          // source="/Users/josehui/Pictures/HKGolden_Plastic_Icon.png"
          theme={editorTheme}
          onBeforeSave={() => false}
          onSave={(editedImageObject, designState) => {
            console.log("saved", editedImageObject, designState);
            saveEdit(editedImageObject);
          }}
          onClose={closeEdit}
          annotationsCommon={{
            fill: "#ff0000",
          }}
          Text={{ text: "Template..." }}
          showBackButton={true}
          Crop={{
            presetsItems: [
              {
                titleKey: "classicTv",
                descriptionKey: "4:3",
                ratio: 4 / 3,
                // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
              },
              {
                titleKey: "cinemascope",
                descriptionKey: "21:9",
                ratio: 21 / 9,
                // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
              },
            ],
            presetsFolders: [
              {
                titleKey: "socialMedia", // will be translated into Social Media as backend contains this translation key
                // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                groups: [
                  {
                    titleKey: "facebook",
                    items: [
                      {
                        titleKey: "profile",
                        width: 180,
                        height: 180,
                        descriptionKey: "fbProfileSize",
                      },
                      {
                        titleKey: "coverPhoto",
                        width: 820,
                        height: 312,
                        descriptionKey: "fbCoverPhotoSize",
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          tabsIds={[TABS.ADJUST, TABS.ANNOTATE]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          defaultToolId={TOOLS.TEXT} // or 'Text'
        />
      )}
    </>
  );
};

export default ImageEditor;
