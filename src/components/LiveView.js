import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./live.css";
import "./button.css";
import { Tooltip } from '@mui/material';
import CameraFeed from './CameraFeed';
import LiveEvents from './LiveEvents';
import { useSelector ,useDispatch} from "react-redux";
import { selectSiteData } from "../reusable_components/site_data/siteDataSlice";
import SideNav from "../Headers/SideNav/SideNav";
import { useLocation, withRouter ,useParams} from "react-router-dom";
import { backend_url } from "../App";
import MiniMap from './MiniMap';
import { LiveFilter } from '../features/filters/LiveFilter';
import { getOrganization, selectOrganization } from "../features/organization/organizationSlice";

const up="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEZklEQVR4nO1bS28cRRAeEG8wD/GGIDhEOGz3eAMroWBP1YhAJEuOp2qM9syJp8SZE5gjZ3BIsPgBROGGkHhaeUAAGZAtYoKIDBJChkNARIgDCk5QzTpR4syud7p7tnfJlPRJ1s5OVX+fq3uqa3qDoLLKKqusssoqM7UwTjfVYo40JqlCel4jT2ukGY38jgaeU8hfCTTwMYW0rJFWFPIfGvmERj69hhOtz+QaLbe+e/a+ucxXy+d0K0aSSkyJHfiwWkxbFfIeBfzbOSS8QMagkHarsbReOvHND49fr5Hf0kirvolfCFrVQLPDo8lQKeQV0D0K6Fv/RDfICORF51NjeDQZEse+yRXAUuPx5g3OBNBZ2nsnVQxAs84WPN2Xc34j0KqOJkesBVDIe/yTMc0C3mUvAPh/1JkLQL9akQ/jdJN3Epaob5+421wAJPBNwBZSMRoLoICe8E3AFgp5ylwAzGr70wMN4GdtMuAV7wTs8bKxABp4V6npCfyeoFwBaMZcAJRtaGkD++De+MmrarXmFRrp3fJEpr3GAiik/SUN6kMhfybOtm3NqxXwR6WIADxnkQH0pXvyfHBkx45r18cSETTSJyWIfdgiA9jxDpA+rcXN69rFazR2XrPWAXKZAd/YCPC9w8F81k2zQkRwPPWWzAUA/slVGhbp1MgUUcgHnMRGWjYWQCOtOBjA12E0cZNh++0Le/H5FxsBfrcMPl+P6cZOew1Bu+tyb9YZtloD6LixAAr5b/PgtLDlMb65ne9azE9ppH8U8Ekd0QsdRQCetxDgL3MBgP41S3tevD/eeUuezziOL1PAr+Zky5uNxtOX590jU0imkmEWnuypAAroaC1u3pHnTzJCIX/c4b91aOSR9La8e7dGzVtNutJ2AmCxKSCPzS2Q3pnnK0QKFfKPXfj5OYT0oTwfIo5GPtK7KYDZK6xuA/0wPJrcledHQzqx7lXYhoNut49fE2GpJ4ug7vYxCHysTevpkhDpRcOu8ilZK4Jg+tILxrV98nYN9F3pj0HVXcqeegCTB/OKGY28z4D4euzL2ztITIldaiGkuiyF5TF1bqUnzVTr5/d5JHixHtN955XLQIdLL4U10kL3c43nNo+PX6miqbFSWulAxxUmj7b6B/x+TzZDumApqoA+l+LGOfmzkMJJYhQbU981RHQvYdcQYReLmG+83bdNUd0DKODXbDJg2jcBawC9ZCyAivm5/4EAz5gLgDzlnYA1ktRYgFp2/M03ATtIXWIsQHixvx4f+AMSSCuBrSmk3QMswIy9AGNpfVAPSUkTJnBhGmjWP6FikMwNXNnwaDJUaGfoH0fkvULg0sLWHn8ATovSgvXK3zETsunQj2sCrUrad3r56sx0NDmigd6Qc3h9QHxFNm3OFryiJumWVYwRsRxIkjM5Cul1OZkhhx6kXZb9+AHoqPTnpEkp3WYF9OcZEvJ36zO5Jt+R78o9PN/yQXvFp/jOYkTEErO0VK+sssoqq6yy4KKw/wCula7IIDbTpgAAAABJRU5ErkJggg==";
const down="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeklEQVR4nO1b3Y8URRAfDKiI50cERcXoA+Fwu/cW2YTg3VRNREkuOW6q5sw+8ySoic8+wfHIOyBw8Q+AHG/GRKNeNH6gAcwZQYjkNCHm4AEMhPhA4IDUzELOY29vpruH2YWppJLL7kxV/X5b3V1d3ed5pZRSSimllFKKqVSDaFUlYF9jGCmkDzXyqEbaq5GPaOAJhXxcVAOfVUhTGmlaIf+rka9o5FtNvZJ8Jt/RVPLs3fcmYluJzdHERxiJT/HtFSGVgNYp5AMK+MIsEIWoxKCQ9quBqJY78NUbBp/SyJ9qpJmigd+rNKOBxnr7w55cwCugVxTQ78UDXSAjkH9zPjR6+8MeMVw0uAx6qv5O42lnBOg47QsHlU2BxpxNeLojx/xCSjPaH+6zJkAhHygejGkW8D57AqD4pc6cADpvBb4aRKsKB2GptU1DL5sTgARFA7BVqRiNCVBA7xYNwFYV8og5ARjX9re6WoHft8mAXYUDsNedxgRooE86AICVKqQ95gSgbEO7nACgw8YEKKRviwZgrcATNhnwc0a2j2qka/kBomuJj2wxWWQAZ9gB0jerBwcfU/7IQC7VI9BFheFb9fq2JRr5iwwZ8KsNAWfSsczHZjcipIKM21mOwMsPUQvotTv26/UtTyign1K+f8qGgL9SOLj5OoZvzH23b/PmZRp53AEB42Jrrn3xKb4XJo+mjAnQSNMp0+zsPDX3oirSx4bb6ZsKeLfnjT5yT1ybhl/QQH+kzM5/jAlQSfc27Rj9s7c/fKklkRANzekCL2Tr6nwlbN+b0fOS1hlsXbQh4L+MY/XMWohebGWrilRNOaTOVSFa3wb8yUyZBHTVnACgG1lTVwGdrgSNla3srX2bn1PIX7cJ9nsB2erddX5jhUlTVgFfv68E6OasvSbYsryVzSAIFsvYbhHoQVniWr1T9YeeVUgnjGKxIgCzDYH/K03KLz6f7UrA7yWFDV/XPn0033O1gJ6RZdY4DpshoJEumRMQZ8JxAdCu4SLaFrxtPWEzCeq0y2BbEuiEpLDhKVSmUtz9Mgj8t20ASRB0VACl9SuFj0L+zolvm0JIpSyFU+qPac7t4jLX7S7UvBTWSJMOA5GJ8YdK0HiyHfjmcbg7nzabIY30i1sCmmt9i9p+48bGUtlRuvYnm6aOa4go4K8E8Gzw8lknNkTGcwkqGQ5fvhpsfbxSaTyqkT7Lzw8fMicAeF+OgUkmfC7ayU3R0TyDuy8KtMOYABXwBw8AAdvNCUAeKRyAtYaRMQGV+Ppb0QDsVJq0xgRUH/bj8a6/IIE07dmKQtrfxQTstSdgIKp16yUp6UN6LkQDjRUPKJtK5nqupLc/7HG/M8xVT2bpP6SS5nFXF9wWpUnrmb9tJsTDoRPnBJqRtG/Xb3Am2h/ui2+PAJ3vAODTsmlzNuFlFUm3uGL0ieVCktzJkR2Y3MyQPb60tON/fgA6Lf05aVLKkZsCunwHhPydfCbfyTPyrLzDxxIbdFhsiu3Yh08sPnNL9VJKKaWUUkrxHgq5De5vrusA/QmoAAAAAElFTkSuQmCC";
const left="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD0UlEQVR4nO1b3WsTQRCPoKJoFcUHxYovYu3tphUCUtqbORQFQZuZRPIsvqj4P9j6N6i1pfgHWPRdRSx+i/hV8fuj9EVaBRFFfBCNytypSExas7d3l5AbGCjJZeZ+v53Z3ZndZjKppJJKKqmkkoqpZL1Cu+OxqzFfUEiHNPKgRjqukc9o4HGFfEdUA79USJMaaVohv9fIHzXyj1/6MfhMvqPJ4Nk/vxv3bQU2BwMf+YL4FN+ZJMTxaLNCHlHAb/4CkYjKOyikYdVX6I4c+IYtO5dp5JMaqZw08H+VyhpotKM33xYJeAW0TgE9TB7oHBGB/MB6anT05tvEcNLg6tDHue2l5dYI0H7YJw6qPgUatTbh6YbM+bmUytrt7wpNgEIeSR6MaRTwUHgCIPmlzpwAmgkFPusV2hN48e827XVv27XWnAAkiHnEXkjeKqAbtmzKjtGYAAW0Jy7wCun579Hq2rFjiQY6a8cuF40J0MAHYxr5J5ugsOZv345TWqiAboa3zQfDRMCRyEce6GkleN+3W+zTSF8s+BgwJkADnYh65B2vtLrSb+fW4nqF9NZOCtAxcwJQytCowPP9jd7uVZU+e3pKi/0y2F6EjRkToJAuRRL2yHecntLKKi7naeTTlokeNyZAI92KEbxE3KB1f0A3jAlQlitABXw76+5aURW8SxxJzQF8LwwBz+y9DF2Thko1P46bdypaZDb1sTkBwFN2RoGu1urUSDpooFcRgZdVYNKYAI00Hf4F+LLjlZZWs5/L7V/wq+kZCXjfP/BrYwJU0L0Nw/6lWuBj2WcE0fcuDAGfQzg/J2t6TfBefl/k4AMCPpkTAPTN0OnZ9d7eRTXt2tvm/k8KfE0JSCYF6HzzpwBGPQnyUENPgtrGMgh8pRYJnufN10gXG3cZhBbfCCmrW2G+XmsrrJA7G3IrrJEm4qoEs8DUcMWQjqQcpruzlMMDDVYOU6s3RNjuyyTQEtPIp8wJgIjX6TiaosBHzQlA+y2q2NviQIdb/GCEDhgToJCLzX40JjfKjAlw/Otv8RAQpANPZV3O2TwclVQyJiDb6sfjTX9BAmk6E1YU0nATE3A8PAF9he5mvSSVRcpmbIgGGk0eUH0qkZuxJR29+TbblWHE+qhW6R1qRVBNcVuUJkLP/LNGgp8OjTgnUFnCfrYepDXRbn+Xf6oDNNMAwKelaLM24dUrEm7+jlGOt4PaYUCupcjNDAV8QY7E/X9+AHoq/TlpUkq3WQF9+A1C/g4+k+/kGXlWfsO3Axs0Jjb9hon4cInFZ2ShnkoqqaSSSiqZlpCfHTSuge7ZcYoAAAAASUVORK5CYII=";
const right="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAECElEQVR4nO1bX2sVVxDfviittcWC2mJ8KYJyz2wiBkqa7MyKVAjY3JlNuX4Fxe+g9jNorBL6AQz6on2rmkoL/Wcpaf0LEvRBYh9EFPGlNabMblJCmk24Z8/Z3Yv7gwOXe/fOOfO7c+bMzJkbBA0aNGjQoEEDW4Rx0teKJQJqJ4b4GJCcBOIJILkIKNOG5DcdgHLfEM8C8ZwheQokz4FkYXE8z97Tz3g2e/a/702nsjKZJ7M52onOqXMHVaAV815Dcs6g/LVMiUqGrsEQnzUjyYB3xXd9MvoekHwNxPNVK/7/wfOAPLl7uL3Zi/IGeadBvlm9outYBMkfzrfG7uH2ZhVctXJdjNuDn3Xed0YApGZfuVLdDeRJZw4Parnn1xs8D9FYf2ECDMm56pWxtQI5U5wArP6osyeAHxdSPoyTPseLel02CQMHDu2wJ4AYXS0kjeqisX710GUSoBGjNQEG+Qs3pijTGkSpTDgwth1IbpVFgCEZtyYAUI4WXgDyT61WZ8Nyua248yEg3ymFBJSjRSzgy+K/AP9tYt6/Unb/p8k2g/JnCSScsCYAkL9y8yvwkzAa/3il/DA6tMWg3PC7Bfi0PQGkaairxfBM/8GDm1YjAZB/9UYA8pQ1AYb4uuMFXQiC4K2V87SGOh94swSUaWsCgPiXsvakJi/qMD1YwI/WBBg/GaAGQ4dXm0+PSl2wYwv4vQgB9/yYJb/IS1TUTyyWwVzNd9ueAJQHXgjISHi4N+psXW3ewcHP3wHia062APGsNQFAPOeNgIyEH1YGSctJMChXChOA8siaAJNVbxeqSlmHhjpvG+RvC5L8pAgBL70TsE64umt0dCOgXC5AwAt7ApBflUFAXri8BN0mgHLJcgv80xBQ/y3AR9bcAsTfVLMFqAQnSDyRN392ElToBMHzMWhQvl/zGCS5Wu0xiP4CIZWdFwil0WAdAiHjMRQOicNc5VG+q0UoDMQzHgh4HcZJZ42MsD7JEPhIh5GP5ykPJD/XLB3m8goiWjavX0FELvR6SQxIztsTgHLGZ1FUTwHf1+4G5ZQ9AaT9Pj1eFs/xOZVejOzB5KPyLkbyw+x1oddKrq/G0luhUu8H20lgi1ba/uZmIerlQ0z2aQtcecrLgonGR6wJCN/06/Geb5AgnguKwhCf7WECJooTMJIM9GqTVF7C1TUAebJ6hbobarmBy0ZJ8JMZ+hq3lo5dZwjjpK83ukV5prDnX9MS0u1QR5/A82r2rbjzbuAboN1e2j2C/LgGis9p0ubM4XULNbc0YoxYFnOHE9qWop0ZerenjQ/pnx+Q72p9TouUWm02yM+WlNDX2Xv6mT6jz+p35EYmg6dUpspO54hYdE5vpt6gQYMGDRoEbwT+BU+BrdxI0Wb5AAAAAElFTkSuQmCC";
const refresh="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFYUlEQVR4nO2ba2gcVRSAJ1VbX62i1So+WiXkMeduElwIabLnjMYWV032nI0s+EOsD3z884GPtrQWVBBEBYUW+jtKkf7y1R/+aJBoq9IfQomvrfj8YUVbWx+tjzZyZ1NMZ2aTmcncnUnYA+fPsHvvud89c+85596xrKY0pSlNMSCtvcVldqFkg8PX55zSmjRV26Bt0TZZjZCeQuUShbJBEX+kSE4qksmMqbbpQ4Wyvs0ZWp44gNZicQmgbFIkRzMw2LB6BIg32nZlcSIQOm6UixXKWAYGFlP5fTU4vCKBV4EPpD+YOSpKVY8lFoR8/v6z5rcn+D1Dv+KRQSjkzekbn6zqNSP6K0FyJG3DDejRSOuFcrfI1I02ojniJ8ODIDdOSNqICUX8PCDvSjMGAeS9oSC09haXJW0okOzr66ucc6qPHDEC8mfpwOAT7f2lpbOCAJJOA7Nwb2CQRvI0EP/dcBjOSMesIGwsDybeMfID9frrcspKu2sjQegxzgoiR3Jz8iCkCshX1e91yyIgeUihHG8ECD3GVEAAyj8KZatlWS0z9Q1UunOhgjgJKNvtgaGrZ+3Ysqxuhy9ceCCQD+g6gRVBFMnqBQUCkPfGqAe0APK7CwcEyhsrnXVn12u/2+FVQc+VU7q7ERAaAgJI9uXzQ+cGtluQvELZrUie8kEYHF6hiH9ZECCA+GDOKV/pba9SqZwxFVr/qwcbBAqQX28UBPMeUZA7vG3psBqI3/7/d/yWDwLxcOS+kI9p7wOUH7MFAmXMHyNsWaRIdnp+V9XPPXnNd5E8D+WHXGHkWvf/xeISRbwjOyAK4vhmGuXxOq/QqK5+2U7lMoU8HgP6Bm9NFUj+SB0EIO/3ttGFw9fMZJwbacbMcAH5sQDo27MA4mFvGwp5W5xBhlP/OmM7UkgdRI44N/3/OtdXyL+ZAgHEf3p3Hr0z6V0rPRDIP3sXSUV8izlvqKlNpZLfC+XNFEGI3i1OEyB+zjQIhfysDwTxM+mBINkZAGLUOAjiHQEe8WCKHsHbAkBMC6DMKKC84+u3UL49RRCy1WcQymvGQRCPevu1UdalBgKIXw0A8YJpEDp38farSB5NzyNIPggw6B7TIHLId80lqDLgEXJoeu4wLaU+YQqCzmK7Vpcv9U0A8sdpesQkDJS7fbND8p4xjwjYsu2+ykW1ND9NECibGnI2cqq/gDpo1OqWmewT+cugMv3UGafxPMMFETGLNZaG51DYZ5y7VkSrNcwC/JugtQGQ+zNUoeJPHMc509cWlq8DlMNzfh1IDtkO9wSY2+LekcoOCJm0C6VHAtvrL7UD8RdzgPB5V0Hagtq2HbkvezVL5GN1Zs09wQKSlyKdbaIcB+QX82sqFwS12TkwDIDye/ZAkKvfBlWypwFZNZWdTszQxoT+TecNIyvrtdOB5cuB+KuMH/DwpzOffE9BGbz1Cr3QAfJtU9qvn4X83/75cuT3vY3SayUsus0kdqJQIOzEgiH+Swdbse42esQt2yNvTup2TaiLIpD01SGUqk6SdAk/1qVXHTUmffs3zNWhVgOXydzXhfggIL8MyDd1rV17Xr3+badyvu2Ui4DyChD/lLQdOiHUfYSaCaWv+iduwOnGAMrX7qGwLrrWdMx9ZjBzdScEeU9ol1Qo682CSE+B+InQINqcoeWA/GvaRifvDXJYHxFaUQSIN6ZteKrXjz2fKezOwgASUeTx2F/z9NS+4arOfwhSnfM3Xh21T5nmr2cgjwfVMWKJbVcW63sJ82kB1QujXhPiBHKzinYv3Xjt7rTZ/T5+fMJ79BYZeXeIK+39paU6HM/KB7DaltARY1Oa0pSmWNHkP4oeYlbKoun+AAAAAElFTkSuQmCC";
const zoomIn="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD3ElEQVR4nO1bX0tUURC/vmd9gJT+EEiesxoZPejOXIoegnBn7pqfIfQr9Mc+QBhUhkiQvWX1kj4G0oMGYYRRZhDSS/gnKhJ80sSYe1cRd8n13B3vLt4fHFh2757fzO/OnTPn7KznpUiRIkWKFClcYYAam33OGuS8Qeq1yH0W6YFFfmGBxw3yOxkW+KtBmrNI8wb5t0VetsgbhbEcvSef0Vx07db3xsO5ojn7hEO4Qk6gRi8JNPt0xiAPGqSlbU4kMgzwYmhLR9Cq7vip85cPW+RHFmk9aceLB61boKGm9ly9ivMGqNEAfUze0V0iAvlDxg8aKup8U3uuXiZO2rk9jJm2S91HKiaADcM+caf2NoCGKpbwbFU+87sNWrfZzpbYAhjkweSdcY0CHogvAPBi7QpACzGdp8bEnYg5Yq0IGcihmmEQnN3iyXKbGg8SOAvQnM1d1TLs9IX8sU2eFug8ocVjgLqcBTBRba9i2PaKrVBh6gjgc4+7AEC3VYxCWvU8r26H2KtKIvQ5C2CBHuqEJS8Wia22saIH7gKgbEMVjAL6XCQA0KyO2DTiLIBBeq10VyZKiD2pIzaPOwtgkd4qGfWyiAt4VCkC3jgLYJR2gAb5cQmxh5XEfh9HgC86d4XvlODqVxEAecZdAOBvShFwfSeXBbqpw0VzzgJYpPn9Kk60ii4D/D2OAL8cCNdkTS8sa5MWacwCP7HIdw3wDXE0k82f3Mkl74UnvuE18jjQcJQYaUKWzWhOXtuzCEA/nQUwwCvlbmxafTouJa2nDOEQLuEs84asOJMZoL/lkHgJodyIdCYwqQB8sB8BGyMJSuKKEliYyIYlsf0vCcqZQNUlQau1DCL11sQyaJQKISl6aqIQMlqlMHJ/TZTCFmlaxygaLuKKiqXq2gxZve3waAmusSrcDpPSgQhPlhBgogoPRPi50l2Z3a98Y5GfugsAPKAiANJSsQD0Q0dsvucuAEq/j4pRazuOxeucihzHJbdsGJ97lMJyY3vZLM0MWjwW6Jq7AEBdWoZJ6bsvP40h550FyCCBlmHyg+gmj/Vz57R4pJ3OXQA/aFALzX0asRumTC03SCDNx3JekLbIdAStB7pJSiAtZ8k7tLchketVCk3tuXq9naHK+FTx47mMHzTURrcoTbdevHLU00CTREL4OFRjTqB1Cftmv/uQpw2b7WwJu0eAFhJ3XGwAHsggZbwkkPGDBqm2LOaCwt7hlkG6b4CeGeBXBngq/PMD0Kycz8khpfw5wgD92XRCXkfvyWdyjVwr3+GpaA4akTnDuUOOXCCcFe8KT5EiRYoUKbwDhX/Ndz5NKqK9WwAAAABJRU5ErkJggg==";
const zoomout="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADW0lEQVR4nO1bUUsUURSeH5AFvbb7Fgh77mggROieMyA+BOKcM9nSP6jsD1gPtT1Wj6Vh0g/ICvwBgfSSEEYoJQUh9RBqUJEg+FBLcWZMpB7cvXf17rrzwQcye+ec+T7O3L33ejYIcuTIkSNHjhy2AORiKZIykJwD4iuGpGqIJwzJU4MyBySvlAblAxCvGOJVIPluSDYMye9tbmTX9DNeycbu3DeXxspiVjWH5kpzIhcDHyhFfApIpoD4yy4RXggo6+mzDCS9+y785OmzRw3JQ0Nc8y38f3LNIE9398dd+yIekIuA/Ma/0D0qgmQpjJJCU8V398ddGti3uAa43DdUOdY0A0xa9t5FNUbk6aZNeKYl3/m9yDVTHulxNgBIpvyLsa0CmXQ3AGW9fQ3gNUfxXPQuwpFO3wghxtT2BhCjtQGlcnzetwBXAvKotQGQre3b24BIxuwNQL7pW0ATWLU2wCDfbwEBjuQJewNIt6G+BbgRkGesDQDi574FOBNlzqEC+OUhqIB5hwqQpUNQAa9dDHjvXYA7l+0NQPnYAgKcqGeM1gYY4tW2NwDls4sB3+pOhry1XTEvgGQWUB4Ayq2QeDwkuRhGScVgMhxG8VAJk8GwLH27mV6L4qFsTFJJ7yEe1xhpLJLZNLbmQN5q4Lm+WhsAKJv1JCmdqRwPDhias84K2LROAsi/6kkSeEKdBvy0TgC5AdLZr4BpcBI0yJ905ZVOWMjTBuW2QblqUC4D8oUQhXWiS/nPJLhzHYV1rN5jUK4Z4jsaK5tYeV5zHNgkaDr9axA6fSEEnb4UNsSLLSDA32bI5Nth7vQDEXniXYA7H9kbgDLZAgKcCCh3XSqg6luAM5GvWxsAkYwdAgMu2RuAPOpdgCO1o8zagJAYfQtwpbbT2RsQJQXfAlzp3DAF7dwgQbzqJF6Rt8gMJL0d3SSlSA83vAtqjFq5QTMbJU177Qzfaltv0EyEUVJoj/8V8mLv4PCJYD/QrZWQvg6tOCdwTcu+FFWOBPsNUx7pSbtHkNe8C9dnQJkMicPAB8IoKehqy1CcbO8dbgDxPUB+DCjPAGUh/fED8js9n9NDSv1xBCD/+CtC/86u6Wc6RsfqPbKQxeAZjZnGTnPEieZseld4jhw5cuTIEXQU/gCQK92BcXz8+QAAAABJRU5ErkJggg==";
function LiveView() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const [row, setRow] = useState(); 
  const full = useParams();
  const [view, setView] = useState("camera");
  const [camera, setCamera] = useState({ cam: "", link: "", id: 0,eventId:"" });
  const date = new Date().toLocaleDateString();
  const [tilt, setTilt] = useState(0);
  const [pan, setPan] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [mintilt, setMinTilt] = useState(0);
  const [minpan, setMinPan] = useState(0);
  const [minzoom, setMinZoom] = useState(0);
  const [maxtilt, setMaxTilt] = useState(90);
  const [maxpan, setMaxPan] = useState(360);
  const [maxzoom, setMaxZoom] = useState(100);
  const [colour, setColor] = useState("white");
  const [eventItem, setEventItem] = useState({ exist: 0, item: "" });
  const [live, setLive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [liveStream,setLiveStream]=useState("")
 const [imageUrls, setImageUrls] = useState([]);
 const [towers, setTowers] = useState(null);
 const [preset, setPreset] = useState(null);
 const [selectedPreset, setSelectedPreset] = useState('');
  const organization = useSelector(selectOrganization);
  const [des,setDes]=useState('');
  const [des1,setDes1]=useState('');
  const [des2,setDes2]=useState('');
  useEffect(() => {
    dispatch(getOrganization());
  }, []);

  const [eventComponent, setEventComponent] = useState(null);

  useEffect(() => {
    
    if (eventComponent === "CVGL") {
      setEventComponent(<LiveEvents />);
    }
    if(id===3){
      setLive(true)
    }
  }, [eventComponent]);

  var timer = "";

 

  const { side_nav: side_nav_check } = useSelector(selectSiteData);
  let side_nav = side_nav_check ? <SideNav /> : null;

  const views = {
    camera: "camera component",
    map: "map component", //<MapContainer />
    video: <VideoComponent row={row} />,
  };

  const Header = {};
  Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
  let config = {
    headers: Header,
  };

  useEffect(() => {
    var sid = id.split(" ");
    fetch(`${backend_url}/core/api/camera/`, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        console.log("tower data:"+actualData.results)
        setTowers(actualData.results);
        var temp_id = Number(id);
        console.log(actualData.results);
        if (sid[0] === "event") setCamera({ cam: "Select a Camera", link: sid[2].replaceAll('(','/'), id: camera.id,eventId:"" });
        else {
          const foundObject = actualData.results.find((obj) => obj.id === temp_id);
          setCamera({ cam: foundObject["description"], link: "", id: foundObject["id"] });
          // setCenter({center:{lat:actualData.results[temp_id]["lat"], lng:actualData.results[temp_id]["lat"]}, zoom: 12, isZoom:false})
          setLiveStream(foundObject["live_stream_url"])
        }
      })
      .catch((err) => {
        setTowers(null);
      });
  }, []);
  useEffect(() => {
    var sid = id.split(" ");
    fetch(`${backend_url}/core/api/preset/?camera_id=${id}`, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        console.log("preset data:"+JSON.stringify(actualData.results))
        setPreset(actualData.results);
        actualData.results.map(obj => {
          if (obj.name === "Default") {
            
            setPan(obj.pan_default);
            setMinPan(obj.pan_min);
            setMaxPan(obj.pan_max);
            setTilt(obj.tilt_default);
            setMinTilt(obj.tilt_min);
            setMaxTilt(obj.tilt_max);
            setZoom(obj.zoom_default);
            setMinZoom(obj.zoom_min);
            setMaxZoom(obj.zoom_max);
          }
          if(obj.name==="Preset 1"){
            setDes(obj.description)
          }else if(obj.name==="Preset 2"){
            setDes1(obj.description)
          }if(obj.name==="Preset 3"){
            setDes2(obj.description)
          }
        });
          
        
      })
      .catch((err) => {
        setPreset(null);
      });
  }, []);
  const eventClick = (item) => {
    // let x=item.camera==1?'Hawa Gali':item.camera==2?'Panja Gali':'Palm Gali';
    console.log("inside events", item);
    let x = item.camera_name;

    setCamera({ cam: x, link: item.file, id: item.id ,eventId:item.uuid});
if(item.uuid!==""){
  setImageUrls([ ])
  loadGifFrames(item.uuid);
}
  };

  const loadGifFrames = async (uuid, url = null) => {
    try {
      const gifUrl = url || `${backend_url}/core/api/image/?event=${uuid}`;
      console.log("gifUrl:", gifUrl);
      const response = await fetch(gifUrl, config);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch GIF frames. Status: ${response.status}`);
      }
  
      const data = await response.json();
      var result = data.results;
      console.log("data:", result);
      
      const imageUrls = result.map(item => { const updatedUrl = item.file.includes('http://127.0.0.1:8000')
      ? item.file.replace('http://127.0.0.1:8000', 'https://api.forestwatch.org.pk')
      : item.file;
      console.log("date of image:",item.date)
    return updatedUrl}
);
      setImageUrls(prevImageUrls => [...prevImageUrls, ...imageUrls]);
  
      if (data.next !== null) {
        // If there are more pages, recursively call loadGifFrames with the next page URL
        await loadGifFrames(uuid, data.next);
      }
    } catch (error) {
      console.error('Error loading GIF frames:', error);
    }
  };
  
  let HandleSubmit = async (e) => {
  //  e.preventDefault();
    try {
      // let nam = camera.cam.split(" ")[0]
      let nam =  camera.cam.replace(" ", "-");
      console.log("nam is", nam);
      console.log("pan value: "+pan)
      let res = await fetch(`${backend_url}/core/api/camera/ptzControls/`, {
        method: "POST",
        body: JSON.stringify({
          pan: pan,
          tilt: tilt,
          zoom: zoom,
          camera: nam,
        }),
        headers: {
          'Content-type': 'application/json;',
          'Authorization': `Token ${localStorage.getItem("token")}`,
        },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setSuccess(true);
       
      } else {
        console.log(resJson.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRefresh = () => {
    if (preset && preset.length > 0) {
      preset.map(obj => {
        if (obj.name === "Default") {
          setPan(obj.pan_default);
          setMinPan(obj.pan_min);
          setMaxPan(obj.pan_max);
          setTilt(obj.tilt_default);
          setMinTilt(obj.tilt_min);
          setMaxTilt(obj.tilt_max);
          setZoom(obj.zoom_default);
          setMinZoom(obj.zoom_min);
          setMaxZoom(obj.zoom_max);
        }else{
          setPan(0);
          setMinPan(0);
          setMaxPan(360);
          setTilt(0);
          setMinTilt(0);
          setMaxTilt(90);
          setZoom(0);
          setMinZoom(0);
          setMaxZoom(100);
        }
      });
    }
  };
  const changePreset = (e) => {
    if (preset && preset.length > 0) {
      preset.map(obj => {
        if (obj.name === e) {
          setSelectedPreset(e)
          setPan(obj.pan_default);
          setMinPan(obj.pan_min);
          setMaxPan(obj.pan_max);
          setTilt(obj.tilt_default);
          setMinTilt(obj.tilt_min);
          setMaxTilt(obj.tilt_max);
          setZoom(obj.zoom_default);
          setMinZoom(obj.zoom_min);
          setMaxZoom(obj.zoom_max);
        }
      });
    }
  };
const changeLive=(liv)=>{
  setLive(liv);
}
const handle_camera_click = () => {
  window.location = '/cameras';
}

const handle_admin_click = () => {
  window.location = 'https://api.forestwatch.org.pk/admin';
}

const handle_dashboard_click = () => {
  window.location = '/dashboard';
}

const handle_home_click = () => {
  window.location = '/';
}
  return (
    <div  >
      <div>
      
        <div >
          <div className='row navbar 'style={{  background: 'rgb(44, 62, 80)',color: 'rgb(243, 156, 18)'}}>
          
            <div className='col-md-4'>
              <div className='row mx-0 px-0'>
              
                <div className='col-md-4 lead ' style={{ color: 'rgb(243, 156, 18) ',fontWeight:'600',fontSize:'20px'}}>Tower Panel</div>
                <div className='col-md-8'>
                  <Dropdown  >
                    <Dropdown.Toggle  style={{  background:'rgb(243, 156, 18)' ,color:'rgb(44, 62, 80)' , border:' 3px solid rgb(44, 62, 80)' ,fontWeight:'700'}}>
                      {camera.cam}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {towers && towers.map((item, index) => (
                        item.live ? (
                          <Dropdown.Item
                            key={item.id}
                            href={`/live/${item.id}`}
                            onClick={() => {
                              setCamera({ cam: item.name, link: "", id: item.id });
                            }}
                          >
                            {item.description}
                          </Dropdown.Item>
                        ) : null
                       
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className='col-md-8' style={{display:'contents'}}>
            <section className="mdc-top-app-bar__section app-shop mdc-top-app-bar__section--align-end mr4"
                         role="toolbar">
                        <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" onClick={handle_home_click} >
                            <span className="mdc-button__ripple"/>
                            <span className="mdc-button__label" style={{ color: 'rgb(243, 156, 18)', }}>Home</span>
                        </button>
                        <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" onClick={handle_dashboard_click}   >
                            <span className="mdc-button__ripple"/>
                            <span className="mdc-button__label" style={{ color: 'rgb(243, 156, 18)'}}>Dashboard</span>
                        </button>
                        <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" onClick={handle_camera_click} >
                            <span className="mdc-button__ripple"/>
                            <span className="mdc-button__label" style={{ color: 'rgb(243, 156, 18)'}}>Cameras</span>
                        </button>
                        <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" onClick={handle_admin_click}  >
                            <span className="mdc-button__ripple"/>
                            <span className="mdc-button__label" style={{ color: 'rgb(243, 156, 18)'}}>Admin</span>
                        </button>
                </section>
              <ul className="nav nav-tabs" defaultActiveKey="/home">
                <li className="nav-item">
                  <a href=""
                    className={colour === "white" ? "nav-link active" : "nav-link"}
                    style={{ textDecoration: "none", color: colour === 'white' ? 'black' : 'white' }}
                    onClick={() => { setView("camera"); setColor("white") }}
                  >
                    Camera
                  </a>
                </li>
                <li>
                  <a
                    className={colour !== "white" ? "nav-link active" : "nav-link"}
                    style={{ color: colour }}
                    onClick={() => { setView("map"); setColor("black") }}
                    eventKey="link-1"
                  >
                    Map
                  </a>
                </li>
              </ul>
              
            </div>
          </div>
          <div className='row' style={{ height: "50%" }}>
            <div className='col-md-4 d-flex justify-content-center'>
              <div className=' row mx-2 px-2 d-flex justify-content-center' style={{ backgroundColor: "white" }}>
               
                  <div className="row d-flex justify-content-center">
                  <center style={{height:'20px',marginTop:'10px'}}>  <p className='lead' style={{display: 'flex', alignItems: 'flex-end' ,justifyContent:'center',fontWeight:'700'}}>PTZ Controls </p>
                  </center>
                   
                <br/>
                    <label className="form-label" htmlFor="customRange1" style={{width:'30%'}}>Pan <span className='lead' style={{ float: 'right' }}>{pan}</span></label>
                    <div className="row range w-50">
                      <input type="range" className="form-range" id="customRange1" value={pan} onChange={(e) => setPan(e.target.value)} min={minpan} max={maxpan} step="1" disabled />
                    </div>
                    <label className="form-label" htmlFor="customRange1" style={{width:'30%'}}>Zoom <span className='lead' style={{ float: 'right' }}>{zoom}</span></label>
                    <div className="row range w-50">
                      <input type="range" className="form-range" id="customRang32" value={zoom} onChange={(e) => setZoom(e.target.value)} min={minzoom} max={maxzoom} step="1" disabled />
                    </div>
                    <label className="form-label" htmlFor="customRange1"style={{width:'30%'}}>Tilt <span className='lead' style={{ float: 'right' }}>{tilt}</span></label>
                    <div className="row range w-50">
                      <input type="range" className="form-range" id="customRange3" value={tilt} onChange={(e) => setTilt(e.target.value)} min={mintilt} max={maxtilt} step="1" disabled/>
                    </div>
                    <center style={{height:'5vh'}}>
                      <p>
                        <div style={{display: 'flex',justifyContent: 'space-evenly',alignItems: 'center'}}>
                          <Tooltip title={des}>
                          <button className="presetButton"
                          onClick={() => changePreset("Preset 1")}
                          disabled={des == ''}>
                            Preset 1
                          </button></Tooltip>
                          <Tooltip title={des1}>
                            <button className="presetButton"
                                  onClick={() => changePreset("Preset 2")}
                                  disabled={des1 == ''}>
                                    Preset 2
                            </button>
                          </Tooltip>
                          <Tooltip title={des2}>
                          <button
                           className="presetButton"
                           onClick={() => changePreset("Preset 3")}
                           disabled={des2 == ''}>
                            Preset 3</button>
                          </Tooltip>
                         </div>
                      </p>
                  </center>
                   {live?(<>
                     <div style={{    display: 'flex', alignItems: 'center',flexDirection: 'column'}}>
                     <div><Tooltip title="Tilt" placement='top'>
                       <button style={{border: 'none',background: 'white'}} onClick={()=>{if(tilt!==maxtilt && tilt+5<=maxtilt){setTilt(tilt+5)}}}>
                        <img src={up} style={{width:'48px',height:'48px'}}/>
                       </button></Tooltip>
                     </div>
                     <div>
                     <Tooltip title="Zoom Out">
                     <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(zoom!==minzoom && zoom-10 >=minzoom){setZoom(zoom-10)}}}>
                         <img src={zoomout} style={{width:'48px',height:'48px'}}/>
                       </button></Tooltip>
                       <Tooltip title="Pan">
                       <button  style={{border: 'none',background:'white'}} onClick={()=>{if(pan!==minpan && pan-10 >=minpan){setPan(pan-10)}}}>
                         <img src={left} style={{width:'48px',height:'48px'}}/>
                       </button></Tooltip>
                       <Tooltip title="reset">
                     <button  style={{border: 'none',background:'white',backgroundColor:'white'}} onClick={()=>{ handleRefresh() }}>
                       <img src={refresh} style={{width:'48px',height:'48px'}}/>
                     </button></Tooltip>
                    <Tooltip title="Pan">
                     <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(pan !== maxpan && pan + 10 <= maxpan){setPan(pan+10)}}}>
                       <img src={right} style={{width:'48px',height:'48px'}}/>
                     </button></Tooltip>
                     <Tooltip title="Zoom In">
                     <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(zoom!==maxzoom&& zoom+10 <=maxzoom){setZoom(zoom+10)}}}>
                         <img src={zoomIn} style={{width:'48px',height:'48px'}}/>
                       </button></Tooltip>
                     </div>
                     <div> <Tooltip title="Tilt">
                       <button style={{border: 'none',background: 'white'}}  onClick={()=>{if(tilt!==mintilt && tilt-5 >=mintilt){setTilt(tilt-5)}}}>
                       <img src={down} style={{width:'48px',height:'48px'}}/>
                       </button></Tooltip>
                       </div> </div>
                   <br/>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <button onClick={HandleSubmit} className="presetButton"  >Confirm</button>
                   </div>
                   </>):(<>
                    <div style={{    display: 'flex', alignItems: 'center',flexDirection: 'column'}}>
                      <div><Tooltip title="Tilt" placement='top'>
                        <button style={{border: 'none',background: 'white'}} onClick={()=>{if(tilt!==maxtilt && tilt+5<=maxtilt){setTilt(tilt+5);}}}>
                         <img src={up} style={{width:'48px',height:'48px'}}/>
                        </button></Tooltip>
                      </div>
                      <div>
                      <Tooltip title="Zoom Out">
                      <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(zoom!==minzoom && zoom-10 >=minzoom){setZoom(zoom-10)}}}>
                          <img src={zoomout} style={{width:'48px',height:'48px'}}/>
                        </button></Tooltip>
                        <Tooltip title="Pan">
                        <button  style={{border: 'none',background:'white'}} 
                        onClick={()=>{if(pan!==minpan&& pan-5>=minpan){setPan(pan-10)}}}>
                          <img src={left} style={{width:'48px',height:'48px'}}/>
                        </button></Tooltip>
                        <Tooltip title="reset">
                        <button  style={{border: 'none',background:'white',backgroundColor:'white'}} onClick={()=>{ handleRefresh() }}>
                       <img src={refresh} style={{width:'48px',height:'48px'}}/>
                     </button></Tooltip>
                     <Tooltip title="Pan">
                      <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(pan!==maxpan&& pan+10<=maxpan){setPan(pan+10);}}}>
                        <img src={right} style={{width:'48px',height:'48px'}}/>
                      </button></Tooltip>
                      <Tooltip title="Zoom In">
                      <button  style={{border: 'none',background: 'white'}} onClick={()=>{if(zoom!==maxzoom && zoom+10 <=maxzoom){setZoom(zoom+10);}}}>
                          <img src={zoomIn} style={{width:'48px',height:'48px'}}/>
                        </button></Tooltip>
                      </div>
                      <div> <Tooltip title="Tilt">
                        <button style={{border: 'none',background: 'white'}}  onClick={()=>{if(tilt!==mintilt && tilt-5 >=mintilt){setTilt(tilt-5);}}}>
                        <img src={down} style={{width:'48px',height:'48px'}}/>
                        </button></Tooltip>
                        </div> </div>
                    
                    </>)}
                    
                  </div>
                
              </div>
            </div>
            <div className='col-md-8' style={{ backgroundColor: '#eeee',    paddingBottom: "20px"}}>
              <div className='mb-3 d-flex justify-content-center' style={{height:'50%',width:"100%"}}>
                {view === "camera" ? <CameraFeed cameraId={camera} view={view} live={live} changeLive={changeLive} liveStream={liveStream} imageUrls={imageUrls} pan={pan} zoom={zoom} tilt={tilt}/> :
                  <MiniMap camId={id} />
                }
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 px-4 py-2 d-flex justify-content-center' style={{ backgroundColor: '#fffff' }}>
              {view === "map" ? <CameraFeed cameraId={camera} view={view} live={live} changeLive={changeLive} liveStream={liveStream} imageUrls={imageUrls} pan={pan} zoom={zoom} tilt={tilt} /> :
                <MiniMap camId={id}/>
              }
            </div>
            <div className='col-md-8 pe-0 me-0' style={{   paddingRight:"10px", backgroundColor: "rgba(238, 238, 238, 0.933)"}}>
             <LiveFilter/>
             {organization.name === "CVGL" ?<LiveEvents eventClick={eventClick} cam_id={id} setRow={setRow} setView={setView} />:<LiveEvents eventClick={eventClick} cam_id={id} setRow={setRow} setView={setView} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const VideoComponent = ({ row }) => {
  return (
    <div>
      <img src={row.event} alt="" />
    </div>
  );
};

export default withRouter(LiveView);
